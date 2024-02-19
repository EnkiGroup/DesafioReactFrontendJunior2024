import React, { memo } from 'react'

const FooterSection: React.FC = memo(
  () => (
    <footer className="information">
        <p>
        Double Click to Edit a Todo{' '}
        </p>
    
        <p>
            Templated by{' '}
            <a href="https://github.com/sindresorhus">Sindre Sorhus</a>
        </p>
        <p>
            Created by{' '}
            <a href="" target='_blank'>Chau Tran</a>
        </p>
        <p>
            Utilized{' '}
            <a href="https://xstate.js.org/">XState </a>
            by {' '}
            <a href="#">David K</a>
        </p>
        <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
    </footer>
  ),
  () => true,
)

export default FooterSection
