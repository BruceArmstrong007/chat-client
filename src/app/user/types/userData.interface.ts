export interface UserDataInterface {
  id: string | null;
  username: string | null;
  name: string | null;
  details: {
    friends: any[];
    requestsSent: any[];
    requestsRecieved: any[];
    find: any[];
  };
}
