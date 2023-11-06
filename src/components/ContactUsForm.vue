<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        v-model="name"
        required
      />
    </div>
    <div>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
      />
    </div>
    <div>
      <label for="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        v-model="subject"
        required
      />
    </div>
    <div>
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-model="message"
        required
      ></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  },
  methods: {
    handleSubmit() {
      fetch("/api/contact", {
        method: "POST",
        body: {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
        },
      })
        .then((response) => {
          console.log("Message sent successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
