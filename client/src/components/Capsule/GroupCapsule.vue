<template>
    <div class="group-card" @click="() => openModalDetails('modalGroupDetails')">
        <div class="group-card-image">
            <img src="classroom1.jpg" />
        </div>
        <div class="group-card-content">
            <h2>{{ group.Group_Name }}</h2>
            <p>{{ group.Belonging.length }} / {{ group.Group_Size }}</p>
        </div>
    </div>

    <ModalDetails ref="modalGroupDetails" @close="closeModal">
        <template v-slot:title>
            <h3>{{ group.Group_Name }}</h3>
        </template>
        <template v-slot:engagement-tag>
            <p>{{ group.Belonging.length }} / {{ group.Group_Size }}</p>
        </template>
        <template v-slot:second-title>
            <p>Created {{ group.Group_Creation }}</p>
        </template>
        <template v-slot:description>
            <p>The Group is {{ group.Group_State }}.</p>
        </template>
        <template v-slot:additonal-information-before-modal-button>
            <p>Click on the button to edit the group.</p>
        </template>
        <template v-slot:modal-button>
            <button @click="() => openModal('EditGroup')">Edit Group</button>
        </template>
    </ModalDetails>

    <Modal ref="EditGroup" @close="closeModal">
        <template v-slot:header-title>
            <h3>Edit Group for</h3>
            <h3>{{ group.Group_Name }}</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Name</label>
            <input type="text" placeholder="Studying Computer Science" />
        </template>
        <template v-slot:form-input-2>
            <label for="form-input-2">Size</label>
            <input type="text" placeholder="5" />
        </template>
        <template v-slot:form-input-description>
            <label for="form-input-description">Description</label>
            <textarea name="form-input-description" id="form-input-description" cols="30" rows="5"
                placeholder="Write the Description here."></textarea>
        </template>
        <template v-slot:form-input-3>
            <label for="form-input-3">Status</label>
            <input type="text" placeholder="Public" />
        </template>
        <template v-slot:modal-button>
            <button>Edit Group</button>
        </template>
    </Modal>
</template>
  
<script lang="ts">
import ModalDetails from "../ModalDetails.vue";
import Modal from "../Modal.vue";

export default {
    name: "GroupCapsule",
    components: {
        ModalDetails,
        Modal,
    },
    props: {
        group: {
            type: Object,
            required: true,
        },
    },
    methods: {
        // Modal methods
        openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModal');
        },
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
        },
        closeModal() {
            console.log('Modal closed');
        },
    }
};
</script>
  
<style scoped>
.group-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    min-width: 200px;
}

.group-card-image {
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    overflow: hidden;
}

.group-card-image img {
    height: 100%;
    width: 100%;
}

.group-card-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 60px;
}

.group-card-content h2 {
    font-size: 16px;
}

.group-card-content p {
    background-color: var(--dark-blue);
    color: #fff;
    padding: 16px;
    border-radius: 16px;
    transform: translateY(-20px);
    font-size: 12px;
    min-width: 25px;
}

/* ModalDetails styling */
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.return-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: var(--dark-blue);
    border: none;
    border-radius: 4rem;
    cursor: pointer;
    padding: 8px 10px;
}

.return-button svg {
    transform: translateY(2px);
}

.image {
    width: 100%;
    height: 200px;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.body {
    padding: 0 20px;
}

.title {
    text-align: center;
}

.title h1 {
    font-size: 24px;
    font-weight: 600;
    color: black
}

.engagement-tag {
    margin-bottom: 10px;
    background-color: var(--dark-blue);
    padding: 8px 16px;
    border-style: solid;
    border-radius: 4rem;
    border-width: 8px;
    border-color: white;
    transform: translateY(-2rem);
    color: white;
}

.engagement-tag p {
    font-size: 14px;
    font-weight: 600;
    min-width: 50px;
    text-align: center;
}

.second-title {
    display: flex;
    align-items: center;
}

.second-title svg {
    margin-right: 4px;
    transform: translateY(-1px);
}

.second-title h2 {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray);
}

.capsule-with-gray-svg,
.capsule-with-blue-svg {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    overflow-x: scroll;
}

.capsule-with-gray-svg svg,
.capsule-with-blue-svg svg {
    margin-right: 10px;
}

.capsule-with-gray-svg p,
.capsule-with-blue-svg p {
    font-size: 14px;
    font-weight: 400;
    color: black;
}


.description-title h2 {
    font-size: 16px;
    font-weight: 600;
    color: black;
}


.description p {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray)
}

.requirement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    overflow-x: scroll;
}

.requirement p {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray)
}

.requirement span {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray);
    padding: 8px 16px;
    border-style: solid;
    border-radius: 4rem;
    border-width: 1px;
}

.wrapper {
    background-color: var(--light-dark-gray);
    border-radius: 1rem;
    margin-top: 10px;
}

.additonal-information-before-modal-button {
    padding: 10px 30px;
}

.additonal-information-before-modal-button p {
    font-size: 14px;
    font-weight: 400;
    color: black;
}

.modal-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-button button {
    width: 100%;
    height: 40px;
    background-color: var(--blue);
    border: none;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    font-size: 14px;
    font-weight: 600;
    color: white;
    cursor: pointer;
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
  