/**
 * @Return Document Reference to Controller
 */
export default interface IFirestore {
  readOne(id:string)
    :Promise<FirebaseFirestore.DocumentReference>
  create(object:FirebaseFirestore.DocumentData)
    :Promise<FirebaseFirestore.DocumentReference>
  readAll()
    :Promise<FirebaseFirestore.QuerySnapshot>
  update(id:string, object:FirebaseFirestore.DocumentData)
    :Promise<FirebaseFirestore.DocumentReference>
  delete(id:string)
    :Promise<FirebaseFirestore.DocumentReference>
}