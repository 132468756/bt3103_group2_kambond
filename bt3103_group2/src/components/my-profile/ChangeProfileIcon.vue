<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
        <header
          class="modal-header"
          id="modalTitle"
        >
          <section name="header">
            {{post.title}}
          </section>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

</template>