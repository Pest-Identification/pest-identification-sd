import { DataStore } from '@aws-amplify/datastore';
import { Auth, Storage } from 'aws-amplify';
import { Pests, Reply, Report, Post, PostReport, ReplyReport } from '../models';




export async function createReport(image,pest=Pests.UNKNOWN){


    if ("geolocation" in navigator) {
      console.log("Location available");
    } else {
      throw new Error("Location unavailable");
    }

    let reportStruct = 
    {
      "authorID": "",
      "location": {longitude: 0, latitude: 0},
      "pestActual": pest,
      "pestSubmitted": pest,
      "pestIdentified": Pests.UNKNOWN,
      "image": ""
    };
    let submitedReport;
    
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (loc) => {resolve(loc)}, // Success
        () => {reject()} // Failure
      )}).then( r => {

        reportStruct.location.longitude = r.coords.longitude; 
        reportStruct.location.latitude = r.coords.latitude; 
        console.log("Got location:" + JSON.stringify(reportStruct.location));
        return Auth.currentUserInfo();
    
      }, ()=> {
        throw new Error("Can't access location.");
      }).then((r) => {

        reportStruct.authorID = r.attributes.sub;

        console.log("Got author ID. Creating report... ")
      
        return DataStore.save(new Report(reportStruct));

      }).then( r => {

        console.log("Submitted report. Getting new backend report id... ");

          // Listen for changes to the report
        return new Promise((resolve, reject) => {
          const subscription = DataStore.observe(Report).subscribe(() => {
            // Retrieve the updated report from the cloud
            console.log("Detected a possible id change. Querying...")
            subscription.unsubscribe(); // Unsubscribe from the observation to avoid memory leaks
            resolve(DataStore.query(Report, r.id));
          })
        });

      }).then( r => {

        console.log("Got backend report id from cloud. Uploading image... ");

        submitedReport = r;

        return Storage.put(r.id + ".jpg",image);

      }).then( r => {

        console.log("Uploaded image. Updating report with image key...");
        
        return DataStore.save(Report.copyOf(submitedReport, updated => {updated.image = r.key}));

      }).then( r => {
        console.log("Report created successfully!", r);
      });


    return;
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