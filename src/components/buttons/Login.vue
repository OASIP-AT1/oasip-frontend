<script setup>
  import { useRouter } from "vue-router";
  
  const appRouter = useRouter();
  const loginRouter = () => appRouter.push({ name: "loginContents" });
  
  </script>
   
  <template>
      <buttons id="login" class="btn font-extrabold px-10 bg-green-600 text-white hover:bg-green-700" @click="loginRouter">LOGIN</buttons>
  </template>
   
  <style>
  #login {
      position: absolute;
      right: 15%;
      top: 3%;
  }
  </style>