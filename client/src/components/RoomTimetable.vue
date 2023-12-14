<template>
   <div class="room-time-table-wrapper">
        <div class="room-time-header">
            <div class="room-time-header-wrapper">
                <label for="start">Reserve room on : </label>
                <input v-model="currentReservationDate" type="date" id="start" name="trip-start"  :min="getCurrentDate()" max="2025-01-01" @change="fetchSchedule()" />
            </div>
        </div>
        <div class="room-time-table">
           <ul>
            <li @click="selectSchedule(schedule)" v-for="(schedule, index) in scheduleArray" :key="index"  :class="{ 
    selected: (schedule === selectedSchedule),
    selectedNegative: (selectedSchedule && selectedSchedule.status === 'reserved' && schedule === selectedSchedule)
  }">
                <span>{{schedule.date.substring(0,5)}} AM</span>&nbsp;
                <i :class="{ 'positive-circle': schedule.status !== 'reserved', 'negative-circle': schedule.status === 'reserved' }">&nbsp;</i>
            </li>
           </ul>
        </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import { verifyToken, readToken } from "../../utils/authUtils";
// import ModalDetails from "../ModalDetails.vue";
// import Modal from "../Modal.vue";
import axios from "axios";

export default defineComponent({
    name: "RoomTimetable",
    components: {
        // ModalDetails,
        // Modal,
    },
    props: {
        room: {
            type: Object,
            required: true,
        },
        
    },
    data() {
        return {
            // Generate an array with dates
            scheduleArray:Array.from({ length: 15 }, (_, i) => ({ date: `${(i + 8).toString().padStart(2, '0')}:00:00`, status: 'initialStatus' })),
            currentReservationDate:"",
            selectedSchedule: null,
            reservedSchedules: []
            // nextSchedule: this.scheduleArray()[this.scheduleArray().indexOf(this.selectedSchedule)+1]
        };
    },
    mounted() {
    //    this.scheduleArray[0].status = "reserved";
       this.currentReservationDate = this.getCurrentDate();
    },
    methods: {
        createReservation() {
            alert(this.currentReservationDate)
        },
        selectSchedule(schedule:any) {
            this.selectedSchedule = schedule;
            this.updateSchedules();
            this.$emit('scheduleTimeChanged', this.selectedSchedule);  // We inform the parent that the time has changed
        },
        async fetchSchedule(){
            this.scheduleArray =  Array.from({ length: 15 }, (_, i) => ({ date: `${(i + 8).toString().padStart(2, '0')}:00:00`, status: 'initialStatus' })) // We regenerate the table
            this.$emit('scheduleDateChanged', this.currentReservationDate); // We inform the parent that the date has changed
            try { 
                // debugger;
                const response = await axios.get(
                    `http://localhost:3000/reserve/date/${this.currentReservationDate}`,
                    {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/',
                        'Content-Type': 'application/json',
                    },
                    }
                );

                    if (response.status === 200) {
                       this.reservedSchedules = response.data;
                       console.log(this.reservedSchedules);
                       this.updateSchedules();
                    } else {
                        throw new Error(`Error fetching schedules. ${response.status}`);
                    }

                } catch (error:any) {
                console.error(error.message);
                }
        },
        updateSchedules(){
            console.log("caca");
            for (const scheduleReserved of this.reservedSchedules) {
                const matchingSchedule = this.scheduleArray.find(schedule => schedule.date === scheduleReserved.Start_Time);
                console.log(matchingSchedule);
                if(matchingSchedule){
                    matchingSchedule.status = "reserved";
                }
            }
        },
        getCurrentDate(){
            return new Date().toISOString().split('T')[0];
        }
    }
});
</script>

<style scoped>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

.room-time-table-wrapper{
    width:100%;
    height:300px;
}

.room-time-header{
    height:15%;
    display:flex;
    align-items:center;
}
.room-time-table{
    display:flex;
    height:90%;
    padding-bottom:20px;
    overflow-y:scroll;
}

.room-time-table ul{
    /* background:red; */
    width:100%;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    padding-top:340px;
    padding-bottom:340px;
    height:100px;
    box-sizing:border-box;
}

.room-time-table ul li{
    min-height:34px;
    width:90%;
    list-style:none;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:3px;
    border:1px solid rgba(0,0,0,0.2);
    color:var(--blue);
    cursor:pointer;
    font-size:14px;
    margin-top:5px;
    margin-bottom:5px;
}

.room-time-table ul .selected{
    border:1px solid var(--blue);
}

.room-time-table ul .selectedNegative{
    border:1px solid var(--red);
}
.room-time-table ul li:hover{
    border:1px solid rgba(0,0,0,0.5);
}

.room-time-table ul .reserved:hover{
    border:1px solid rgba(0,0,0,0.2);
    cursor:not-allowed;
}

.room-time-header-wrapper{
    width:95%;
    margin-left:auto;
    margin-right:auto;
    display:flex;
    justify-content:center;
    align-items:center;
}

.room-time-header-wrapper label{
    font-size: 14px;
    color: var(--dark-gray);
}
.room-time-header-wrapper input{
    /* margin-right:auto;
    float:right; */
    margin-left:auto;
    line-height:20px;
    cursor:pointer;
    /* background:red; */
}
.positive-circle{
    background:var(--green);
    height:12px;
    width:12px;
    border-radius:100%;
}

.negative-circle{
    background:var(--red);
    height:12px;
    width:12px;
    border-radius:100%;
}



</style>
