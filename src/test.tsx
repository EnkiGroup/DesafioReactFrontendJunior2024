import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import type { MutableSnapshot } from 'recoil'
import { RecoilRoot } from 'recoil'

import type { AppState, TodoListType } from './datastructure'
import { recoilState } from './datastructure'

const defaultValue: TodoListType = []

export const TestRenderer = (
  ui: React.ReactElement,
  initialRecoilStateValue: TodoListType = defaultValue,
): RenderResult =>
  render(
    <BrowserRouter>
      <RecoilRoot
        initializeState={({ set }: MutableSnapshot): void =>
          set(recoilState, initialRecoilStateValue)
        }
      >
        {ui}
      </RecoilRoot>
    </BrowserRouter>,
  )
