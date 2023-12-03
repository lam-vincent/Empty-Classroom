<template>
    <!-- Equipment Section -->
    <section v-if="userData.token.role === 'Admin'" class="equipment">
        <div class="equipment-title">
            <h2>Equipments</h2>
            <button @click="openModal('lightBulbModal')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#facc15" height="20px" width="20px">
                    <path
                        d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
                </svg>
            </button>
        </div>

        <div class="display-case">
            <EquipmentCapsule v-for="(equipment, index) in Equipment.currentEquipment" :key="index" :equipment="equipment"
                @click="() => openModalDetails('modalEquipmentDetails')" />
            <button @click="openModal('addEquipmentModal')">Add Equipment</button>
        </div>

        <Modal ref="lightBulbModal" @close="closeModal">
            <h3 slot="header">Custom Header</h3>
            <!-- Your custom content here -->
        </Modal>

        <ModalDetails ref="modalEquipmentDetails" @close="closeModal">
            <h3 slot="header">Custom Header</h3>
            <!-- Your custom content here -->
        </ModalDetails>

        <Modal ref="addEquipmentModal" @close="closeModal">
            <h3 slot="header">Custom Header</h3>
            <!-- Your custom content here -->
        </Modal>
    </section>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import EquipmentCapsule from "./EquipmentCapsule.vue";
import Modal from "./Modal.vue";
import ModalDetails from "./ModalDetails.vue";
import axios from "axios";

export default {
    components: {
        EquipmentCapsule,
        Modal,
        ModalDetails,
    },


    data() {
        return {
            userData: {
                token: "",
            },
            Equipment: {
                fetchedEquipment: [],
                currentEquipment: [],
            }
        };
    },


    beforeMount() {
        verifyToken();
        this.userData.token = readToken();
        console.log("EquipmentSection this.userData.token", this.userData.token.role);
        if (this.userData.token.role === "Admin") {
            console.log("EquipmentSection this.userData.token.role === Admin");
            this.fetchAllEquipment();
        }
    },

    mounted() {
        console.log("EquipmentSection mounted");
    },

    methods: {
        // Axios methods
        handleSuccess(response: any) {
            console.log("response", response);
        },

        handleError(error: any) {
            console.log(error);
        },

        // Modal methods
        openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModal');
        },
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModalDetails');
        },
        closeModal() {
            console.log('Modal closed');
        },

        // Equipment methods
        async fetchAllEquipment() {
            try {
                const response = await axios.get('http://localhost:3000/equipment', {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });
                debugger;
                this.Equipment.fetchedEquipment = response.data;
                this.Equipment.currentEquipment = [...this.Equipment.fetchedEquipment];
                this.handleSuccess(response.data);
            } catch (error) {
                this.handleError(error);
            }
        },

        async addEquipment() {
            try {
                const response = await axios.post('http://localhost:3000/equipment', {
                    name: "test",
                    status: "test",
                    roomId: 1,
                }, {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });
                console.log(response);
                this.handleSuccess(response.data);
            } catch (error) {
                this.handleError(error);
            }
        },


    },
};
</script>
  
<style scoped>
.display-case {
    display: flex;
    overflow: scroll;
}


.equipment-title {
    display: flex;
}

.equipment-title svg {
    transform: translateY(0.25rem);
}

button {
    color: var(--blue);
    background-color: transparent;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
}


button:hover {
    color: var(--dark-blue);
}
</style>
  