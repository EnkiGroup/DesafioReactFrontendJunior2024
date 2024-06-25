import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ReducersTypes = {
  listTodo: {
    id: number
    title: string
    isDone: boolean
    isEdit: boolean
  }[]
  titleEdit: string
  rotaAtual: string
  allDone: boolean
}

export type Todo = {
  id: number
  title: string
  isDone: boolean
  isEdit: boolean
}

const initialState: ReducersTypes = {
  listTodo: [],
  titleEdit: '',
  rotaAtual: 'all',
  allDone: true
}

const statesReducers = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const buscarItem = state.listTodo.find(
        (item) => item.title === action.payload
      )

      if (buscarItem) {
        alert('Esse item ja esta adicionado na lista')
        return
      }

      if (action.payload.length < 1) {
        return
      }

      state.listTodo.push({
        id: state.listTodo.length + 1,
        title: action.payload,
        isDone: false,
        isEdit: false
      })
    },
    isCompleted: (state, action: PayloadAction<Todo>) => {
      const find = state.listTodo.find(
        (item) => item.title === action.payload.title
      )

      if (find) {
        find.isDone = !find.isDone
        return
      }
    },
    clearTodo: (state) => {
      const filter = state.listTodo.filter((item) => item.isDone !== true)

      state.listTodo = filter
    },
    allCompleted: (state) => {
      const newList: Todo[] = []

      if (state.allDone === true) {
        state.allDone = false
      } else {
        state.allDone = true
      }

      for (let i = 0; i < state.listTodo.length; i++) {
        newList.push({
          id: state.listTodo[i].id,
          title: state.listTodo[i].title,
          isDone: !state.allDone,
          isEdit: state.listTodo[i].isEdit
        })
      }

      state.listTodo = newList
    },
    deleteItem: (state, action: PayloadAction<Todo>) => {
      const deleteItem = state.listTodo.filter(
        (item) => item.id !== action.payload.id
      )

      state.listTodo = deleteItem
    },
    capturaNewTitle: (state, action: PayloadAction<string>) => {
      state.titleEdit = action.payload
    },
    editItem: (state, action: PayloadAction<Todo>) => {
      const find = state.listTodo.find((item) => item.id === action.payload.id)

      if (find) {
        find.isEdit = !find.isEdit

        if (state.titleEdit) {
          find.title = state.titleEdit
        }
      }
    },
    capturarRota: (state, action: PayloadAction<string>) => {
      state.rotaAtual = action.payload
    }
  }
})

export const {
  addTodo,
  isCompleted,
  clearTodo,
  allCompleted,
  deleteItem,
  editItem,
  capturaNewTitle,
  capturarRota
} = statesReducers.actions

export default statesReducers.reducer
