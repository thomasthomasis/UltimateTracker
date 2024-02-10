import {Workout} from './Workout'
import { createRealmContext } from '@realm/react'

export const RealmContext = createRealmContext({
    schema: [Workout],
})