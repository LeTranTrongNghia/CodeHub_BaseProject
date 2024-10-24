className UserService{
    constructor(realtimeDb, accessToken){
        this.collectionName = 'user.json';
        this.realtimeDb = realtimeDb;
        this.accessToken = accessToken;
    }

    signUpUser =  async (entity) =>{
        const response = await axios.post(this.realtimeDb + this.collectionName, entity);
        const insertedId = await response.data.collectionName;
        return insertedId;
    }
}

export default UserService;