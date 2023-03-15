import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify';
import { Pests, Reply, Report, Post, PostReport, ReplyReport } from '../models';




export async function createReport(image,pest=Pests.UNKNOWN){

    console.log(image)

    if ("geolocation" in navigator) {
      console.log("Location available");
    } else {
      console.log("Location unavailable");
      return null;
    }

    /*//////////////////
    Code that uploads picture?
    *//////////////////

    let location = {"longitude": 0.0, "latitude": 0.0};
    
    navigator.geolocation.getCurrentPosition(
        (loc) => {location.longitude = loc.coords.longitude; location.latitude = loc.coords.latitude; console.log("Got location:" + location);}, // Success
        () => {console.log("Can't get location"); return null;} // Failure
      );

    let report = {
      "authorID": (await Auth.currentUserInfo()).attributes.sub,
      "time": new Date().toISOString(),
      "location": location,
      "pestActual": pest,
      "pestSubmitted": pest,
      "pestIdentified": Pests.UNKNOWN,
      "image": image,
      "postID": null
    } 


    /*////////////////
    Code that runs inference and populates "pestIdentified"
    Either returns "report" with "pestIdentified"
    or creates the report and returns the result.
    */////////////////

    console.log("Creating report: ", report);

    // Store
    let reportPromise = DataStore.save(new Report(report));

    console.log("Report created: ", reportPromise);

    return reportPromise;
  }

  export async function createReply(post,body,refReports){

    
    // Assemble reply object
    let reply = {
      "authorID": (await Auth.currentUserInfo()).attributes.sub,
      "title": "",
      "body": body,
      "postID": post
    }

    console.log("Creating reply: ", reply);

    // Store (before creating relationships)
    let replyPromise = DataStore.save(new Reply(reply));

    console.log("Reply created: ", replyPromise)

    // Create relationship for each report in array
    if (refReports != null){

      console.log("Creating relationships to reports...");

      for(let report in refReports){
        console.log("Creating relationship to report:", report);
        let relPromise = await DataStore.save(new ReplyReport({"report": report, "reply": reply}));
        console.log("Related",  report, " to ", replyPromise, ": ", relPromise);

      }
    }

    console.log("Finished making reply.")

    return replyPromise;
  }

  export async function createPost(title,body,refReports=null){

    // Assemble post object
    let post = {
      "authorID": (await Auth.currentUserInfo()).attributes.sub,
      "title": title,
      "body": body,
      "replies": null
    }

    console.log("Creating post: ", post);

    // Store (before creating relationships)
    let postPromise = DataStore.save(new Post(post));

    console.log("Post created: ", postPromise)

    // Create relationship for each report in array
    if (refReports != null){

      console.log("Creating relationships to reports...");

      for(let report in refReports){
        console.log("Creating relationship to report:", report);
        let relPromise = await DataStore.save(new PostReport({"report": report, "post": post}));
        console.log("Related",  report, " to ", postPromise, ": ", relPromise);

      }
    }

    console.log("Finished making post.")

    return postPromise;
  }