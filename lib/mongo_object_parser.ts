import { ObjectId } from 'bson';

export class MongoObjectParser {
  private parsedObject: any;
  constructor(private object: any) {
    const flattenedObject = this.flattenObject(this.object);
    const modifiedObj = this.modifyFlattenObject(flattenedObject);
    console.log('Modified OBJ', modifiedObj);
    this.parsedObject = this.unflatten(modifiedObj);
  }
  get parse(): any {
    return this.parsedObject;
  }
  private flattenObject(data: any) {
    const toReturn: any = {};

    for (const i in data) {
      if (!data.hasOwnProperty(i)) continue;

      if (typeof data[i] == 'object' && data[i] !== null) {
        const flatObject = this.flattenObject(data[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = data[i];
      }
    }
    return toReturn;
  }
  private unflatten(data: any) {
    const result = {};
    for (const i in data) {
      var keys = i.split('.');
      keys.reduce(function (r: any, e, j) {
        return (
          r[e] ||
          (r[e] = isNaN(Number(keys[j + 1]))
            ? keys.length - 1 == j
              ? data[i]
              : {}
            : [])
        );
      }, result);
    }
    return result;
  }
  private modifyFlattenObject(data: any) {
    for (let i in data) {
      if (i.endsWith('.ObjectId')) {
        console.log(i);
        const p = i.replace('.ObjectId', '');
        data[p] = new ObjectId(data[i]);
        delete data[i];
        console.log(i);
      }
    }
    console.log('FROM DATA: ', JSON.stringify(data, null, 2));
    return data;
  }
}
// export const ObjectID = (obj: Object) => {

// };

// const bb = {
//   _id: {
//     ObjectId: '5f8b296ad8865d9bf8e3eb8c',
//   },
//   text: {
//     name: 'test',
//     address: {
//       personal: 'abc',
//       office: {
//         building: 'random',
//         street: 'some street',
//         payments: [
//           { hello: 'World' },
//           { hello: 2 },
//           {
//             hello3: {
//               isIt: {
//                 ObjectId: '5f8b296ad8865d9bf8e3eb8c',
//               },
//             },
//           },
//         ],
//       },
//     },
//   },
// };

// const klm = flattenObject(bb);
// const united = unflatten(klm);
// console.log(ObjectID(bb));
// // console.log(JSON.stringify(klm, null, 2));
// // console.log(JSON.stringify(united, null, 2));
