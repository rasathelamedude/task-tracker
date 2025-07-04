import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  createUser: async (newUser) => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      return { success: false, message: "Please fill out all the fields!" };
    }

    try {
      const response = await fetch("/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || "Sign up failed!" };
      }

      set(() => ({ user: newUser }));
      localStorage.setItem("token", data.data.token);
      return { success: true, message: "User created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  validateUser: async (userCredentials) => {
    if (!userCredentials.email || !userCredentials.password) {
      return { success: false, message: "Please provide required credentials" };
    }

    try {
      const res = await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Login failed!" };
      }

      set(() => ({ user: userCredentials }));
      localStorage.setItem("token", data.data.token);
      return { success: true, message: "Logged in successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  createTask: async (newTask) => {
    if (newTask.name.trim().length === 0) {
      return { success: false, message: "A name is required" };
    }

    try {
      const res = await fetch("/api/v1/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();

      return {
        success: true,
        message: data.message,
        data: data.data.user,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  editTask: async (newTaskValues) => {
    const { id, name, description, status } = newTaskValues;

    if (name.trim().length === 0) {
      return { success: false, message: "Name is required!" };
    }

    try {
      const response = await fetch(`/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          description,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message };
      }

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await fetch(`/api/v1/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        return { success: false, message: "Something went wrong!" };
      }

      return { success: true, message: "Task deleted successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  editUser: async (newUserDetails) => {
    const { id, username, email, password } = newUserDetails;

    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: "Something went wrong!" };
      }

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        return { success: false, message: "Something went wrong!" };
      }

      return { success: true, message: "User deleted successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
