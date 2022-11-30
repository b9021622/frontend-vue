<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Session ID</label>
          <input
            type="text"
            class="form-control"
            id="SessionID"
            required
            v-model="Session.SessionID"
            name="SessionID"
          />
        </div>
        <div class="form-group">
          <label for="SessionName">Session Name</label>
          <input
            type="text"
            class="form-control"
            id="SessionName"
            required
            v-model="Session.SessionName"
            name="SessionName"
          />
        </div>
        <div class="form-group">
        <label for="why">Lecturer:  </label>
        <select id = "Why" label: Lecturer v-model="Session.Lecturer"> <option class="list-group-item"
          v-for=" (lec, index) in Lecturers" :value="lec._id"
          :key="index" 
          >
           {{  lec.LecturerFName + "  " +  lec.LecturerSName
             
          }}
          </option>
        </select >
        </div>
        <div class="form-group">
          <label for="SessionName">Session Type</label>
          <input
            type="text"
            class="form-control"
            id="SessionType"
            required
            v-model="Session.SessionType"
            name="SessionType"
          />
        </div>
        <div class="form-group">
          <label for="SessionDate">Session Date/Time</label>
          <input
            type="datetime-local"
            class="form-control"
            id="SessionDate"
            required
            v-model="Session.SessionDate"
            name="SessionDate"
          />
        </div>
        <div class="form-group">
          <label for="Length"> Length (Hrs)</label>
          <input
            type="number"
            class="form-control"
            id="Length"
            required
            v-model="Session.Length"
            name="Length"
          />
        </div>
        <div class="form-group">
        <label for="why">Module:  </label>
        <select id = "Why" label: SessionModule v-model="Session.Module"> <option class="list-group-item"
          v-for=" (mod, index) in Modules" :value="mod"
          :key="index" 
          >
           {{  mod.ModuleID + "  " +  mod.ModuleName
             
          }}
          </option>
        </select >
        </div>
  
        <button @click="saveSession" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newSession">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import LecturerDataService from "@/services/LecturerDataService";

import ModuleDataService from "../services/ModuleDataService";
import SessionDataService from "../services/SessionDataService";
//import StudentDataService from "../services/SessionDataService";
  export default {
    name: "add-animal",
    data() {
      return {
        Session: {
          id: null,
          SessionID: "",
          SessionName: "",
          Lecturer: "",
          SessionType: "",
          SessionDate: "",
          Length: "",
          Module: "",
          StudentsScheduled: [],
          attendenceCode: ""
        },
        Lecturers: [],
        Modules: [],
        ChosenSessionModule: null,
        Students:[],
        LecturerNames: [],
        submitted: false
      };
    },
    methods: {
      getLecturers(){
        LecturerDataService.getAll()
        .then(response => {
            this.Lecturers = response.data,
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          });
      },
      getModules(){
        ModuleDataService.getAll()
        .then(response => {
            this.Modules = response.data,
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          });
      },
      generateCode(){
        var codeValid = 0;
    while(codeValid == 0){
      let result = [];
      let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
      
      for (let n = 0; n < 5; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
      }
      result = result.join("");
      console.log(result);
      var error = [];
      SessionDataService.getCode(result)
      .then(response => {
            error = response.data;
          })
          .catch(e => {
            console.log(e);
          }),
      console.log(error.length);
      if(error.length == 0){
        var codeData = {Code: result}
        SessionDataService.addCode(codeData);
        this.Session.attendenceCode = result;
        codeValid = 1;
        console.log("Done");
      }
    }
      },  
     
      saveSession() {
      console.log("STUDENTSSCHEDUCDEDSf")
      this.generateCode();
      console.log(this.Session.attendenceCode);
       console.log(this.Session.Module);
        var data = {
          SessionID: this.Session.SessionID,
          SessionName: this.Session.SessionName,
          Lecturer: this.Session.Lecturer,
          SessionType: this.Session.SessionType,
          SessionDate: this.Session.SessionDate,
          Length: this.Session.Length,
          SessionModule: this.Session.Module._id,
          StudentsScheduled: this.Session.Module.StudentsEnrolled,
          attendanceCode : this.Session.attendenceCode
        };
       
        console.log("ReadyToSend");
        console.log(data);
        SessionDataService.create(data)
          .then(response => {
            this.Session= response.data;
            console.log("RECIEVED");
            console.log(this.Session);
            
          })
          .catch(e => {
            console.log(e);
          })
          console.log("OOp")
         
          
        this.submitted = true;
      },
      
      newSession() {
        this.submitted = false;
        this.Module = {};
      }
    },
    mounted() {
   
   this.getLecturers();
   this.getModules();
 }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>