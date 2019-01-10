import { LindaOperation, LindaResponse, Tuple } from "yurucomi-interfaces";
import LindaClient from "linda-client";
import checkMatch from "./checkMatchs";
import emitter from "./utils/eventEmitter";
import { setTmpData } from "./tmpData";
import getUserIcon from "./utils/getUserIcon";
import settingUpdater from "./settingUpdater";

export default class YurucomiSpace {
  tupleSpaceName: string;
  lindaClient: LindaClient;
  constructor(tsName: string) {
    this.lindaClient = new LindaClient();
    this.lindaClient.connect(
      // "https://new-linda.herokuapp.com",
      "http://localhost:7777",
      tsName
    );
    this.tupleSpaceName = tsName;
  }
  write(tuple: Tuple) {
    this.lindaClient.write(tuple);
  }
  watch() {
    console.log(this.tupleSpaceName, "watching");
    this.lindaClient.watch({}, (resData: LindaResponse) => {
      console.log(this.tupleSpaceName, resData);
      if (resData._from) {
        settingUpdater(resData);
        checkMatch(resData, async users => {
          console.log("matched", users);
          if (users.length > 0) {
            const icon: string = await getUserIcon(
              resData._where,
              resData._from
            );
            const returnData = Object.assign(resData, {
              _fromIcon: icon,
              _matchedUsers: users,
            });
            setTmpData(users, resData._id, returnData);
            emitter.emit("_event", returnData);
          }
        });
      }
    });
  }
}
