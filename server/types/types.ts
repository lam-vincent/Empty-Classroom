export type User = {
  id_user: number;
  User_Name: string;
  User_Password: string;
  User_Class: string;
  User_Picture: string;
  User_Description: string;
  User_Promo: number;
  User_Role: string;
};

export type Group = {
  id_group: number;
  Group_Creation: string;
  Group_Password: string;
  Group_Name: string;
  Group_Size: number;
  Group_State: string;
  Belonging?: any;
};

export type Room = {
  id_room: number;
  Room_Name: number;
  Room_Building: string;
  Room_Campus: string;
  Room_Location: string;
  Room_State: string;
  Room_Category: string;
  Room_reservations?: any;
};

export type Equipment = {
  id: number;
  equipment_name: string;
  equipment_type: string;
  equipment_location: string;
  equipment_description: string;
  equipment_status: string;
};

export type Reserve = {
  id_reserve: number;
  id_room: number;
  id_user: number;
  Title: string;
  Description: string;
  Start_Time: string;
  End_Time: string;
};

export type Belong = {
  id_user: number;
  id_group: number;
};

export type Prefer = {
  id_user: number;
  id_room: number;
};

export type Is_Equiped = {
  id_room: number;
  id_equipment: number;
};
