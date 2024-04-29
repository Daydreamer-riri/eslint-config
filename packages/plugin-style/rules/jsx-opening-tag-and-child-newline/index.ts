import { isNodeFirstInLine } from '../../utils/ast'
import { createRule } from '../../utils/createRule'
import { docsUrl } from '../../utils/docsUrl'
import type { Tree } from '../../utils/types'

export type RuleOptions = []
export type MessageIds = 'onOwnLine' | 'matchIndent'

const messages = {
  onOwnLine: 'Closing tag of a multiline JSX expression must be on its own line.',
  matchIndent: 'Expected closing tag to match indentation of opening.',
}

const hasNewlineReg = /^\s*\n/

export default createRule<MessageIds, RuleOptions>({
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce opening tag and child newline for multiline JSX',
      url: docsUrl('jsx-opening-tag-and-child-newline'),
    },
    fixable: 'whitespace',
    messages,
    schema: [],
  },

  create(context) {
    function handleJSXElement(node: Tree.JSXElement | Tree.JSXFragment) {
      if (node.loc.start.line === node.loc.end.line)
        return

      if (node.children.length === 0)
        return

      const firstChild = node.children[0]
      if (isJSXText(firstChild) && hasNewlineReg.test(firstChild.value))
        return

      const whitespaceLength = (isJSXText(firstChild) ? firstChild.value.match(/^\s*/)?.[0].length : 0) ?? 0
      context.report({
        node: firstChild,
        messageId: 'onOwnLine',
        loc: firstChild.loc,
        fix(fixer) {
          const indent = Array(node.loc.start.column + 3 - whitespaceLength).join(' ')
          if (isNodeFirstInLine(context, firstChild)) {
            return fixer.replaceTextRange(
              [firstChild.range[0] - firstChild.loc.start.column, firstChild.range[0]],
              indent,
            )
          }

          return fixer.insertTextBefore(firstChild, `\n${indent}`)
        },
      })
    }

    return {
      JSXElement: handleJSXElement,
      JSXFragment: handleJSXElement,
    }
  },
})

function isJSXText(node: Tree.JSXChild): node is Tree.JSXText {
  return node.type === 'JSXText'
}
