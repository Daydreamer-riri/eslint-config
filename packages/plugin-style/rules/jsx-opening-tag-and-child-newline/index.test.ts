import { runTest } from '../../test-utils/tester'
import rule from './index'

runTest('jsx-opening-tag-and-child-location', rule, {
  * valid() {
    yield `const a = <div>literal</div>`

    yield `
      <div>
        literal
      </div>
    `
  },
  * invalid() {
    yield {
      code: `
        <div>literal
        </div>
      `,
      output: `
        <div>
          literal
        </div>
      `,
      errors: [
        { messageId: 'onOwnLine' },
      ],
    }
    yield {
      code: `
        <div> <span>literal</span>
        </div>
      `,
      output: `
        <div>
          <span>literal</span>
        </div>
      `,
      errors: [
        { messageId: 'onOwnLine' },
      ],
    }
    yield {
      code: `
        <div><span>literal</span>
        </div>
      `,
      output: `
        <div>
          <span>literal</span>
        </div>
      `,
      errors: [
        { messageId: 'onOwnLine' },
      ],
    }
  },
})
