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
                @equipmentListUpdated="fetchAllEquipment()" />
            <button @click="openModal('addEquipmentModal')">Add Equipment</button>
        </div>

        <Modal ref="lightBulbModal" @close="closeModal">
            <template v-slot:header-title>
                <h3>Congrats, if you see this message, it means that you are an admin.</h3>
            </template>

        </Modal>


        <Modal ref="addEquipmentModal">
            <template v-slot:header-title>
                <h3>Add Equipment</h3>
            </template>
            <template v-slot:form-input-1>
                <label for="form-input-1">Name</label>
                <input v-model="newEquipmentData.Equipment_Name" type="text" placeholder="Desk" required />
            </template>
            <template v-slot:form-input-2>
                <label for="form-input-2">Type</label>
                <input v-model="newEquipmentData.Equipment_Type" type="text" placeholder="Furniture" required />
            </template>
            <template v-slot:form-input-description>
                <label for="form-input-description">Description</label>
                <textarea v-model="newEquipmentData.Equipment_Description" name=" form-input-description"
                    id="form-input-description" cols="30" rows="5" placeholder="Write the Description here."
                    required></textarea>
            </template>
            <template v-slot:form-input-3>
                <label for="form-input-3">Location</label>
                <input v-model="newEquipmentData.Equipment_Location" type="text" placeholder="On the floor" required />
            </template>
            <template v-slot:form-input-4>
                <label for="form-input-4">Status</label>
                <input v-model="newEquipmentData.Equipment_Status" type="text" placeholder="Operational" required />
            </template>
            <!-- <template v-slot:form-input-5>
                <label for="form-input-5">Require</label>
                <input v-model="newEquipmentData.Equipment_Require" type="text" placeholder="Nothing" />
            </template> -->
            <template v-slot:modal-button>
                <button @click="addEquipment">Add Equipment</button>
            </template>
        </Modal>
    </section>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../../utils/authUtils";
import EquipmentCapsule from "../Capsule/EquipmentCapsule.vue";
import Modal from "../Modal.vue";
import ModalDetails from "../ModalDetails.vue";
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
            },
            newEquipmentData: {
                Equipment_Name: "",
                Equipment_Type: "",
                Equipment_Description: "",
                Equipment_Location: "",
                Equipment_Status: "",
                // Equipment_Require: "",
            },
        };
    },


    beforeMount() {
        verifyToken();
        this.userData.token = readToken();
        if (this.userData.token.role === "Admin") {
            this.fetchAllEquipment();
        }
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
                // debugger;
                const response = await axios.get('http://localhost:3000/equipment', {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });
                this.Equipment.fetchedEquipment = response.data.equipment;
                this.Equipment.currentEquipment = [...this.Equipment.fetchedEquipment];
                this.handleSuccess(response.data);
            } catch (error) {
                this.handleError(error);
            }
        },

        async addEquipment() {
            try {
                await axios.post('http://localhost:3000/equipment', this.newEquipmentData, {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });

                this.fetchAllEquipment();
                window.location.reload();

            } catch (e) {
                console.log(e);
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

/* Modal styling */
h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    font-family: Helvetica, Arial, sans-serif;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.header-return-button {
    display: flex;
    justify-content: center;
}

.header-return-button button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}

.form-input-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.form-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.form-input-description label,
.form-input label {
    width: auto;
    margin-bottom: 5px;
    font-size: 14px;
    color: var(--dark-gray);
}

.form-input-description textarea {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
    resize: none;
}

.form-input input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
}

.modal-button {
    display: flex;
    justify-content: center;
}

.modal-button button {
    background-color: var(--blue);
    color: #fff;
    padding: 10px 80px;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    outline: none;
}
</style>
  