import { runTest } from '../../test-utils/tester'
import rule from './index'

runTest('jsx-literal-indent', rule, {
  * valid() {
    yield `const a = <div>literal</div>`
  },
  * invalid() {
    yield {
      code: `
        <div>
    literal
        </div>
      `,
      output: `
        <div>
          literal
        </div>
      `,
      errors: [
        { messageId: 'wrongIndent' },
      ],
    }
    // yield {
    //   code: `
    //     <div>literal
    //     </div>
    //   `,
    //   output: `
    //     <div>
    //       literal
    //     </div>
    //   `,
    //   errors: [
    //     { messageId: 'wrongIndent' },
    //   ],
    // }
  },
})
