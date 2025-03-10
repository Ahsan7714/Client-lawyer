import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
  users:[]
};  


// login the user
export const loginUser = createAsyncThunk("login/user", async ( data,{rejectWithValue } ) => {
  try {
    console.log(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const response = await axios.post(
      'http://localhost:8080/api/v1/login',
      {
        email: data.email,
        password: data.password,
      },
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
//  Register user
export const registerClient = createAsyncThunk(
  "register/user",
  async ({ email, name, password, profile_picture_image,city,province }, { rejectWithValue }) => {
    try {
      

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        {name,email,password,profile_picture_image,province,city},
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Register Lawyer
export const registerLawyer = createAsyncThunk(
  "register/user",
  async ({ email, name, password, profile_picture_image,city,province,lawyer_license_image,lawyer_cnic_image,role,practice_area }, { rejectWithValue }) => {
    try {
      

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        {name,email,password,profile_picture_image,province,city,lawyer_cnic_image,lawyer_license_image,role,practice_area},
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// update password

export const updateProfile = createAsyncThunk(
  'password/Profile',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const response = await axios.put('http://localhost:8080/api/v1/me/update',data,config);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
  }
);




// load user

export const loadUser = createAsyncThunk(
  'load/user',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const response = await axios.get('http://localhost:8080/api/v1/me',config);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
  }
);

// logout the user
export const logoutUser=createAsyncThunk("logout/user",async()=>{
try{

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  
  axios.get("http://localhost:8080/api/v1/logout", config);
}catch(error){
  console.log(error)
}

})

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors:(state)=>{
      state.error=""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading= true
      state.isAuthenticated= false
      state.user= null
      state.error= ""
    });
    builder.addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false
        state.isAuthenticated= true
        state.user= action.payload
        state.error= ""
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
        state.loading=false
        state.isAuthenticated= false
        state.user=null
        state.error= action.payload
    })
    // load user
    builder.addCase(loadUser.pending,(state)=>{
      state.loading= true
      state.isAuthenticated= false
      state.user= null
      state.error= ""
    })
    builder.addCase(loadUser.fulfilled,(state,action)=>{
      state.loading=false
      state.isAuthenticated= true
      state.user= action.payload
      state.error= ""
  })
  builder.addCase(loadUser.rejected,(state,action)=>{
      state.loading=false
      state.isAuthenticated= false
      state.user=null
      state.error= null
  })
//logout the user
builder.addCase(logoutUser.pending,(state)=>{
  state.loading= true
  state.isAuthenticated= false
  state.user= null
  state.error= ""
})
builder.addCase(logoutUser.fulfilled,(state,action)=>{
  state.loading=false
  state.isAuthenticated= false
  state.user= null
  state.error= ""
})
builder.addCase(logoutUser.rejected,(state,action)=>{
  state.loading=false
  state.isAuthenticated= false
  state.user=null
  state.error= action.payload
})

  
// register user
builder.addCase(registerClient.pending, (state) => {
  state.loading= true
  state.isAuthenticated= false
  state.user= null
  state.error= ""
});
builder.addCase(registerClient.fulfilled,(state,action)=>{
    state.loading=false
    state.isAuthenticated= true
    state.user= action.payload
    state.error= ""
})
builder.addCase(registerClient.rejected,(state,action)=>{
    state.loading=false
    state.isAuthenticated= false
    state.user=null
    state.error= action.payload
})

// udpate password
builder.addCase(updateProfile.pending, (state) => {
  state.loading= true
  state.error= ""
});
builder.addCase(updateProfile.fulfilled,(state,action)=>{
    state.loading=false
    state.isAuthenticated= true
    state.user= action.payload
    state.error= ""
})
builder.addCase(updateProfile.rejected,(state,action)=>{
    state.loading=false
    state.error= action.payload
})
},  
});

export const {clearErrors}=userReducer.actions
export default userReducer.reducer