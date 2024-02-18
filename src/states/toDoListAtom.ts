import {atom} from 'jotai'
import { Tasks } from '../@types'

export const toDoListAtom = atom<Tasks[]>([])

