export class User {
    uid: string
    email: string
    displayName: string
    photoURL?: string
    profile?: string
    
    constructor(){
        this.uid = ""
        this.email = ""
        this.displayName = "" 
    }
}
