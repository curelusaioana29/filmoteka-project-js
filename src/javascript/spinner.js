export default {
  spinnerShow() {
    // Show the spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('is-hidden__spinner');

    // Log to the console
    console.log('Spinner shown');
  },

  spinnerClose() {
    // Hide the spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.add('is-hidden__spinner');

    // Log to the console
    console.log('Spinner hidden');
  },
};
// Import the spinner utility
// import spinner from './spinner'; // Adjust the path based on your file structure

// ... Your existing code ...

// Example usage in your code:
async function performSearch(searchQuery, page = 1) {
  try {
    // Show the spinner while performing the search
    spinner.spinnerShow();

    // Your existing search logic

    // Simulate an asynchronous operation (replace this with your actual search logic)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Hide the spinner after the search is complete
    spinner.spinnerClose();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

