import axiosClient from "@/lib/axiosClient";

const MenuService = {

  getFullMenu: async () => {
    
    try {
      const res = await axiosClient.get(`http://localhost:3080/api/mainmenu/menu`, {
        params: { user_id: '00141', user_type: '17' },
      });
      return res.data;
    } catch (err) {
      throw err; // already formatted by interceptor
    }
  },
};


export default MenuService;
