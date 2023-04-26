import AsyncStorage from "@react-native-async-storage/async-storage";
import Datastore from "react-native-local-mongodb";

// set the global database state for the mongo storage
let GLOBAL_DB;

// insertData inserts new data into the embedded mongo db
// it is called when there is no recorded user data in the application database
async function insertData(db) {
  const data = {
    _id: 1,
  };
  await db.insertAsync(data);
}

// retrieveData retrieves data from the embedded mongo db
async function retrieveData(db) {
  return await db.findOneAsync({ _id: 1 });
}

// updateData updates data in the embedded mongo db
async function updateData(db, update) {
  await db.updateAsync({ _id: 1 }, update);
}

// removeData removes data from the embedded mongo db
async function removeData(db) {
  // remove all auth data on device
  await db.removeAsync({}, { multi: true });
}

// prepareMongoStorage loads the mongo database and prepares the storage for queries
export async function prepareMongoStorage() {
  // create persistent datastore with automatic loading
  const db = new Datastore({
    filename: "asyncStorageKey",
    storage: AsyncStorage,
    autoload: true,
  });

  // retrieve the user details
  const doc = await retrieveData(db);
  if (doc) {
    return db;
  }

  // if there are no user details, insert a new user document
  await insertData(db);

  // return the database instance to the global caller
  return db;
}

// getItemsFromMongoStorage retrieves stored items from the mongo storage
export async function getItemsFromMongoStorage() {
  if (!GLOBAL_DB) {
    GLOBAL_DB = await prepareMongoStorage();
  }

  const data = await retrieveData(GLOBAL_DB);

  if (!data) {
    return null;
  }

  return {
    userId: data.user_id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    displayName: data.display_name,
    phoneNumber: data.phone_number,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    appAppearance: data.app_appearance,
    appPrecision: data.app_precision,
  };
}

// setAuthItemInMongoStorage sets authentication related data in the mongo storage
export async function setAuthItemInMongoStorage(authItem) {
  if (!GLOBAL_DB) {
    GLOBAL_DB = await prepareMongoStorage();
  }

  const update = {
    $set: {
      user_id: authItem.userId,
      first_name: authItem.first_name,
      last_name: authItem.last_name,
      email: authItem.email,
      display_name: authItem.displayName,
      phone_number: authItem.phoneNumber,
      access_token: authItem.accessToken,
      refresh_token: authItem.refreshToken,
    },
  };

  await updateData(GLOBAL_DB, update);
}

// unsetAuthItemInMongoStorage unsets the authentication data in the mongo storage
export async function unsetAuthItemInMongoStorage() {
  if (!GLOBAL_DB) {
    GLOBAL_DB = await prepareMongoStorage();
  }

  await removeData(GLOBAL_DB);
}

// setAppearanceDataInMongoStorage sets the user appearance setting in the mongo storage
export async function setAppearanceDataInMongoStorage(appearance) {
  if (!GLOBAL_DB) {
    GLOBAL_DB = await prepareMongoStorage();
  }

  const update = {
    $set: {
      app_appearance: appearance,
    },
  };

  await updateData(GLOBAL_DB, update);
}

// setPrecisionDataInMongoStorage sets the user precision setting in the mongo storage
export async function setPrecisionDataInMongoStorage(precision) {
  if (!GLOBAL_DB) {
    GLOBAL_DB = await prepareMongoStorage();
  }

  const update = {
    $set: {
      app_precision: precision,
    },
  };

  await updateData(GLOBAL_DB, update);
}
