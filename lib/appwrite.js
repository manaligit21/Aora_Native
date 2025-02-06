import { Client, Account ,ID, Avatars, Databases,Query } from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '679e004600397996b3ae',
    databaseId: '679e03d2003e5daafbf8',
    userCollectionId: '679e045c0008c4653076',
    videoCollectionId: '679e09a100326a095231',
    storageId: '679e0c40000ed8ea77db'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
export const createUser = async(email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;
        const avatarURL = avatars.getInitials(username)
        await signIn(email, password);
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
            accountId: newAccount.$id,
            email:email,
            username: username,
            avatar: avatarURL
            }
        )
        return newUser;
    }
    catch(error){
    console.log(error) ;
    throw new Error(error) ;
    }

}    

export async function signIn(email, password){
    try {
        const session = await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}
