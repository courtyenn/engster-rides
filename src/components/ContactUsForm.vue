<template>
  <div class="ml-auto mr-auto w-full max-w-md">
    <form
      @submit.prevent="handleSubmit"
      class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
    >
      <div class="mb-4">
        <label
          for="name"
          class="mb-2 block text-sm font-bold text-gray-700"
          >Name:*</label
        >
        <input
          type="text"
          id="name"
          v-model="name"
          required
          placeholder="John Doe"
          class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        />
      </div>
      <div class="mb-4">
        <label
          for="email"
          class="mb-2 block text-sm font-bold text-gray-700"
          >Email:*</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="john@hotmail.com"
          class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        />
      </div>
      <div class="mb-4">
        <label
          for="subject"
          class="mb-2 block text-sm font-bold text-gray-700"
          >Subject:*</label
        >
        <input
          type="text"
          id="subject"
          v-model="subject"
          required
          placeholder="I have a question about..."
          class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        />
      </div>
      <div class="mb-4">
        <label
          for="message"
          class="mb-2 block text-sm font-bold text-gray-700"
          >Message:*</label
        >
        <textarea
          id="message"
          v-model="message"
          required
          placeholder="Your message here..."
          class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        ></textarea>
      </div>
      <div class="mb-4">
        <label
          for="garage"
          class="mb-2 block text-sm font-bold text-gray-700"
          >What's in your garage?:</label
        >
        <textarea
          id="garage"
          v-model="garage"
          class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        ></textarea>
      </div>
      <button
        type="submit"
        :class="{
          'bg-accent': loading == '',
          'bg-green-500': loading == 'success',
          'bg-red-500': loading == 'error',
          'rounded-full bg-accent px-4 py-2 text-center font-bold text-white hover:opacity-80 lg:w-6/12': true,
          'opacity-75': loading != '',
        }"
        :disabled="loading != ''"
      >
        {{ loading === "" ? "Submit" : "" }}
        {{ loading === "loading" ? "Submitting..." : "" }}
        {{ loading === "success" ? "Success!" : "" }}
        {{ loading === "error" ? "ERROR: Please try again" : "" }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      loading: "",
    };
  },
  methods: {
    handleSubmit() {
      this.loading = "loading";
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
          garage: this.garage || "",
        }),
      })
        .then((response) => {
          console.log("Message sent successfully");
          setTimeout(() => {
            this.loading = "success";
          }, 500);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(() => {
            this.loading = "error";
          }, 500);
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = "";
          }, 3000);
        });
    },
  },
};
</script>
