import {Realm} from '@realm/react';

export class Workout extends Realm.Object {
    static schema = {
      name: "Workout",
      properties: {
        _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
        cardio: "string",
        resistance: "string",
        plyometrics: "string",
        cardio: "string",
        resistance: "string",
        plyometrics: "string",
      },
      primaryKey: "_id",
    };
  }