import { withPluginApi } from "discourse/lib/plugin-api";
import Composer from "discourse/models/composer";
import Draft from "discourse/models/draft";
import User from "discourse/models/user";
import Group from "discourse/models/group";
import { next } from "@ember/runloop";
function initializeTestPlugin(api) {
	
	api.modifyClass('route:new-message', {
	   beforeModel(transition) {
	      const params = transition.to.queryParams;
	      const groupName = params.groupname || params.group_name;
	      console.log("New message", this.currentUser,params,groupName);
	      if (this.currentUser) {
	         this.replaceWith("userPrivateMessages", this.currentUser).then(e => {
	            console.log("replaced with userPrivateMessages",e);
	         });
	         console.log("after replaced with userPrivateMessages");
	      } else {
	         $.cookie("destination_url", window.location.href);
	         this.replaceWith("login");
	         console.log("after replaced with login");
	      }
	   }
	});
}
export default {
	name: "topic-metadata.js",
	initialize() {
		withPluginApi("0.1", initializeTestPlugin);
	}
};
