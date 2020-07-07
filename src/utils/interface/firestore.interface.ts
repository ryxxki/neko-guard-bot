/**
 * @Return Document Reference to Controller
 */
export default interface IFirestore {
  readOne(id:string)
    :Promise<FirebaseFirestore.DocumentReference>
  create(id: string, object:FirebaseFirestore.DocumentData)
    :Promise<FirebaseFirestore.WriteResult>
  readAll()
    :Promise<FirebaseFirestore.QuerySnapshot>
  update(id:string, object:FirebaseFirestore.DocumentData)
    :Promise<FirebaseFirestore.DocumentReference>
  delete(id:string)
    :Promise<FirebaseFirestore.DocumentReference>
}