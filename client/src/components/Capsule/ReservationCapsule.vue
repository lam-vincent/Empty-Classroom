<template>
    <div class="reservation-card" @click="openModalDetails('modalReservationDetails')">
        <div class="reservation-card-content">
            <h2>{{ reservation.Title }}</h2>
            <p>{{ reservation.start_time }} - {{ reservation.end_time }}</p>
        </div>

        <ModalDetails ref="modalReservationDetails" @close="closeModal">

            <template v-slot:title>
                <h1>{{ reservation.Title }}</h1>
            </template>

            <template v-slot:second-title>
                <p>Details about the reservation:</p>
                <p>{{ reservation.Description }}</p>
            </template>

        </ModalDetails>
    </div>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../../utils/authUtils";
import ModalDetails from "../ModalDetails.vue";
import Modal from "../Modal.vue";
import axios from "axios";

export default {
    name: "ReservationCapsule",
    components: {
        ModalDetails,
        Modal,
    },
    props: {
        reservation: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            userData: {
                token: "",
            },
        };
    },
    beforeMount() {
        verifyToken();
        this.userData.token = readToken();
    },
    methods: {
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
        },
        closeModal() {
            (this.$refs.modalReservationDetails as any).close();
        },
    },
};
</script>
  
<style scoped></style>
  