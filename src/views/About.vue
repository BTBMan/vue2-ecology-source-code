<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="$store.commit('changeCounter')">mutation {{ $store.state.counter }}</button>
    {{ ' ' }}
    <button @click="$store.dispatch('changeCounter')">action {{ $store.state.counter }}</button>
    {{ ' ' }}
    <span>{{ $store.getters.doubleCounter }}</span>
    <table class="test-table">
      <tbody>
        <tr>
          <td>
            <div class="inner"></div>
          </td>
          <td>
            <div class="inner">
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
              <div>sdklfjklsd</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  .inner {
    background-color: #f60;
    height: 100%;
  }
  table {
    width: 100%;
    background-color: #ddd;
    margin: 20px auto;
    height: 0;
  }
  /* table tbody {
  }
  table tbody tr {
  } */
  table tbody tr td {
    width: 50%;
    /* border: 1px solid #000; */
  }
</style>
