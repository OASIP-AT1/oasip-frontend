<script setup>
    import { useRouter } from "vue-router";
    const appRouter = useRouter();
    const homeRouter = () => appRouter.push({ name: "homeContents" });
    
    </script>
     
    <template>
          <div class="text-center">
            <img
              class="mt-32 w-2/4 h-auto mx-auto"
              src='../assets/notfound.png'
              alt=""
            />
            <p class="font-extrabold text-gray-400 text-2xl ">PAGE NOT FOUND !!!</p>
            <button
            @click.left="homeRouter"
            class="btn btn-color mt-5 text-base px-10">Go Home Page</button>
          </div>
    </template>
     
    <style>
    .btn-color {
      @apply border-transparent;
      color: white;
      background-color: #f99952;
    }
    
    </style>