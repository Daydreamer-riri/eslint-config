import type { ASTNode, ReportFixFunction, Token, Tree } from '../../utils/types'
import { createRule } from '../../utils/createRule'
import { docsUrl } from '../../utils/docsUrl'

export type Schema0 = 'tab' | number
export type RuleOptions = [Schema0?]
export type MessageIds = 'wrongIndent'

const messages = {
  wrongIndent: 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.',
}

export default createRule<MessageIds, RuleOptions>({
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce JSX literal indentation',
      url: docsUrl(`jsx-literal-indent`),
    },
    fixable: 'whitespace',

    messages,

    schema: [
      {
        anyOf: [
          {
            type: 'string',
            enum: ['tab'],
          },
          {
            type: 'integer',
          },
        ],
      },
      {
        type: 'object',
        properties: {
          checkAttributes: {
            type: 'boolean',
          },
          indentLogicalExpressions: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const extraColumnStart = 0
    let indentType = 'space'
    let indentSize = 2

    if (context.options.length) {
      if (context.options[0] === 'tab') {
        indentSize = 1
        indentType = 'tab'
      }
      else if (typeof context.options[0] === 'number') {
        indentSize = context.options[0]
        indentType = 'space'
      }
    }

    const indentChar = indentType === 'space' ? ' ' : '\t'

    /**
     * Responsible for fixing the indentation issue fix
     * @param node Node violating the indent rule
     * @param needed Expected indentation character count
     * @returns function to be executed by the fixer
     * @private
     */
    function getFixerFunction(node: ASTNode, needed: number): ReportFixFunction {
      const indent = Array(needed + 1).join(indentChar)

      if (node.type === 'JSXText' || node.type === 'Literal') {
        return function fix(fixer) {
          const regExp = /\n[\t ]*(\S)/g
          const fixedText = node.raw.replace(regExp, (match, p1) => `\n${indent}${p1}`)
          return fixer.replaceText(node, fixedText)
        }
      }

      if (node.type === 'ReturnStatement') {
        const raw = context.sourceCode.getText(node)
        const lines = raw.split('\n')
        if (lines.length > 1) {
          return function fix(fixer) {
            const lastLineStart = raw.lastIndexOf('\n')
            const lastLine = raw.slice(lastLineStart).replace(/^\n[\t ]*(\S)/, (match, p1) => `\n${indent}${p1}`)
            return fixer.replaceTextRange(
              [node.range[0] + lastLineStart, node.range[1]],
              lastLine,
            )
          }
        }
      }

      return function fix(fixer) {
        return fixer.replaceTextRange(
          [node.range[0] - node.loc.start.column, node.range[0]],
          indent,
        )
      }
    }

    /**
     * Reports a given indent violation and properly pluralizes the message
     * @param node Node violating the indent rule
     * @param needed Expected indentation character count
     * @param gotten Indentation character count in the actual node/code
     * @param [loc] Error line and column location
     */
    function report(node: ASTNode, needed: number, gotten: number, loc?: ASTNode['loc']) {
      const msgContext = {
        needed,
        type: indentType,
        characters: needed === 1 ? 'character' : 'characters',
        gotten,
      }

      context.report({
        node,
        messageId: 'wrongIndent',
        data: msgContext,
        fix: getFixerFunction(node, needed),
        ...loc ? { loc } : {},
      })
    }

    /**
     * Get node indent
     * @param node Node to examine
     * @param [byLastLine] get indent of node's last line
     * @param [excludeCommas] skip comma on start of line
     * @return {number} Indent
     */
    function getNodeIndent(node: ASTNode | Token, byLastLine = false, excludeCommas = false) {
      let src = context.sourceCode.getText(node, node.loc.start.column + extraColumnStart)
      const lines = src.split('\n')
      if (byLastLine)
        src = lines[lines.length - 1]
      else
        src = lines[0]

      const skip = excludeCommas ? ',' : ''

      let regExp
      if (indentType === 'space')
        regExp = new RegExp(`^[ ${skip}]+`)
      else
        regExp = new RegExp(`^[\t${skip}]+`)

      const indent = regExp.exec(src)
      return indent ? indent[0].length : 0
    }

    /**
     * Check indent for Literal Node or JSXText Node
     * @param node The node to check
     * @param indent needed indent
     */
    function checkLiteralNodeIndent(node: Tree.Literal | Tree.JSXText, indent: number) {
      const value = node.value
      // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
      const regExp = indentType === 'space' ? /\n( *)[\t ]*\S/g : /\n(\t*)[\t ]*\S/g
      const nodeIndentsPerLine = Array.from(
        String(value).matchAll(regExp),
        match => (match[1] ? match[1].length : 0),
      )
      const hasFirstInLineNode = nodeIndentsPerLine.length > 0
      if (
        hasFirstInLineNode
        && !nodeIndentsPerLine.every(actualIndent => actualIndent === indent)
      ) {
        nodeIndentsPerLine.forEach(nodeIndent => {
          report(node, indent, nodeIndent)
        })
      }
    }

    function handleLiteral(node: Tree.Literal | Tree.JSXText) {
      if (!node.parent)
        return

      if (node.parent.type !== 'JSXElement' && node.parent.type !== 'JSXFragment')
        return

      const parentNodeIndent = getNodeIndent(node.parent)
      checkLiteralNodeIndent(node, parentNodeIndent + indentSize)
    }

    return {
      Literal: handleLiteral,
      JSXText: handleLiteral,
    }
  },
})
