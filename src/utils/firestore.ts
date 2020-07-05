import Ifirestore from './interface/firestore.interface'
import db from './config'

export default class FirestoreRepo implements Ifirestore{
  private collection:FirebaseFirestore.CollectionReference
  constructor(collectionName: string){
    this.collection = db.collection(collectionName)
  }
  /**
   * @param id => Berisi Nama Unik dari Document 
   */
   async readOne(id: string): Promise<FirebaseFirestore.DocumentReference> {
    try {
      return this.collection.doc(id)
    } catch (error) {
      throw new Error("Method not implemented.")
    }
  }
  /**
   * @param object => Berisi Data yang berbentuk DocumentData
   */
  async create(object: FirebaseFirestore.DocumentData): Promise<FirebaseFirestore.DocumentReference> {
    try {
      return await this.collection.add(object)
    } catch (error) {
      throw new Error("Method not implemented.")
    }
  }
  /**
   * @kosong
   */
  async readAll(): Promise<FirebaseFirestore.QuerySnapshot> {
    try {
      return await this.collection.get()
    } catch (error) {
      throw new Error("Method not implemented.")
    }
  }
  /**
   * @param id => Berisi Nama Unik dari Document 
   * @param object => Berisi Data yang berbentuk DocumentData
   */
  async update(id: string, object: FirebaseFirestore.DocumentData): Promise<FirebaseFirestore.DocumentReference> {
    const ref:FirebaseFirestore.DocumentReference = this.collection.doc(id)
    try {
      if(!(await ref.get()).exists){
        return Promise.reject(ref)
      }
      await ref.update(object)
      return ref
    } catch (error) {
      throw new Error("Method not implemented.")
    }
  }
  /**
   * @param id => Berisi Nama Unik dari Document 
   */
  async delete(id: string): Promise<FirebaseFirestore.DocumentReference> {
    const ref:FirebaseFirestore.DocumentReference = this.collection.doc(id)
    try {
      if(!(await ref.get()).exists){
        return Promise.reject(ref)
      }
     await ref.delete()
     return ref
    } catch (error) {
      throw new Error("Method not implemented.")
    }
  }
  
}