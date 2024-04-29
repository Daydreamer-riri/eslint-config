import type { ASTNode, SourceCode, Token } from './types'

export function getFirstNodeInLine(context: { sourceCode: SourceCode }, node: ASTNode | Token): any {
  const sourceCode = context.sourceCode
  let token: ASTNode | Token = node
  let lines: string[] | null = null
  do {
    token = sourceCode.getTokenBefore(token)!
    lines = token.type === 'JSXText'
      ? token.value.split('\n')
      : null
  } while (
    token.type === 'JSXText' && lines && /^\s*$/.test(lines[lines.length - 1])
  )
  return token
}

export function isNodeFirstInLine(context: { sourceCode: SourceCode }, node: ASTNode) {
  const token = getFirstNodeInLine(context, node)
  const startLine = node.loc!.start.line
  const endLine = token ? token.loc.end.line : -1
  return startLine !== endLine
}
