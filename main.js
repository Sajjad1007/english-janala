const username = document.getElementById("username");
const password = document.getElementById("password");
const navbar = document.getElementById("navbar");
const banner = document.getElementById("banner");
const learn = document.getElementById("learn");
const buttonContainer = document.getElementById("btn-container");
const vocabContainer = document.getElementById("vocab-container");
const loader = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalBox = document.getElementById("modal-box");
const faq = document.getElementById("faq");
const github = document.getElementById("github");

const validateUsername = (str) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  return regex.test(str);
};

document
  .getElementById("get-started-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    if (!validateUsername(username.value)) {
      Swal.fire({
        icon: "error",
        title:
          "<h2 class='font-poppins font-bold text-3xl'>Invalid Username!</h2>",
        html: "<p class='text-[#62748e] text-lg font-normal'>Please enter your username correctly.</p>",
        customClass: {
          popup: "rounded-lg",
          confirmButton:
            "btn bg-custom-purple hover:bg-custom-purple font-poppins font-medium text-custom-white hover:text-custom-white text-lg rounded-lg px-6 w-20 h-12 py-0",
        },
      });
      username.value = "";
    } else if (password.value !== "123456") {
      Swal.fire({
        icon: "error",
        title:
          "<h2 class='font-poppins font-bold text-3xl'>Invalid Password!</h2>",
        html: "<p class='text-[#62748e] text-lg font-normal'>Please enter your password: 123456.</p>",
        customClass: {
          popup: "rounded-lg",
          confirmButton:
            "btn bg-custom-purple hover:bg-custom-purple font-poppins font-medium text-custom-white hover:text-custom-white text-lg rounded-lg px-6 w-20 h-12 py-0",
        },
      });
      password.value = "";
    } else {
      Swal.fire({
        title: "<h2 class='font-poppins font-bold text-3xl'>Welcome!</h2>",
        html: "<p class='text-[#62748e] text-lg font-normal'>You have logged in successfully.</p>",
        icon: "success",
        customClass: {
          popup: "rounded-lg",
          confirmButton:
            "btn bg-custom-purple hover:bg-custom-purple font-poppins font-medium text-custom-white hover:text-custom-white text-lg rounded-lg px-6 w-20 h-12 py-0",
        },
      });
      removeActiveButtons();
      showDefaultLesson();
      banner.classList.remove("block");
      banner.classList.add("hidden");
      navbar.classList.remove("hidden");
      navbar.classList.add("block");
      learn.classList.remove("hidden");
      learn.classList.add("block");
      faq.classList.remove("hidden");
      faq.classList.add("block");
      github.classList.remove("hidden");
      github.classList.add("block");
      username.value = "";
      password.value = "";
    }
  });

const logout = () => {
  Swal.fire({
    title: "<h2 class='font-poppins font-bold text-3xl'>Are you sure?</h2>",
    html: "<p class='text-[#62748e] text-lg font-normal'>You will be logged out immediately!</p>",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    customClass: {
      popup: "rounded-lg",
      confirmButton:
        "font-poppins font-medium text-lg rounded-lg px-6 w-20 h-12 py-0",
      cancelButton:
        "font-poppins font-medium text-lg rounded-lg px-6 w-20 h-12 py-0",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "<h2 class='font-poppins font-bold text-3xl'>Good Bye!</h2>",
        html: "<p class='text-[#62748e] text-lg font-normal'>You have logged out successfully.</p>",
        icon: "success",
        customClass: {
          popup: "rounded-lg",
          confirmButton:
            "btn bg-custom-purple hover:bg-custom-purple font-poppins font-medium text-custom-white hover:text-custom-white text-lg rounded-lg px-6 w-20 h-12 py-0",
        },
      });
      navbar.classList.remove("block");
      navbar.classList.add("hidden");
      learn.classList.remove("block");
      learn.classList.add("hidden");
      faq.classList.remove("block");
      faq.classList.add("hidden");
      github.classList.remove("block");
      github.classList.add("hidden");
      banner.classList.remove("hidden");
      banner.classList.add("block");
    }
  });
};

const showLoader = () => {
  vocabContainer.classList.remove("block");
  vocabContainer.classList.add("hidden");
  loader.classList.remove("hidden");
  loader.classList.add("flex");
};

const hideLoader = () => {
  loader.classList.remove("flex");
  loader.classList.add("hidden");
  vocabContainer.classList.remove("hidden");
  vocabContainer.classList.add("block");
};

const removeActiveButtons = () => {
  const activeButtons = document.getElementsByClassName("active-btn");

  for (const activeButton of activeButtons) {
    activeButton.classList.remove("active-btn");
    activeButton.classList.add("non-active-btn");
  }
};

const showDefaultLesson = () => {
  vocabContainer.classList.remove(
    "grid-cols-1",
    "sm:grid-cols-2",
    "lg:grid-cols-3",
    "gap-5"
  );
  vocabContainer.innerHTML = `
    <p class="text-[#79716b] font-siliguri text-sm text-center default-lesson" lang="bn">আপনি এখনো কোনো Lesson সিলেক্ট করেন নি।</p>
    <p class="text-secondary-black font-siliguri text-2xl sm:text-3xl font-medium mt-3 text-center default-lesson">একটি Lesson সিলেক্ট করুন।</p>
  `;
};

const displayLessonButtons = () => {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/levels/all`)
    .then((res) => res.json())
    .then((object) =>
      object.data.forEach((level) => {
        const button = document.createElement("button");
        button.classList.add(
          "btn",
          "btn-neutral",
          "text-base",
          "px-3",
          "rounded-md",
          "h-10",
          "min-h-9",
          "font-semibold",
          "w-32",
          "flex",
          "flex-col",
          "mx-auto",
          "non-active-btn"
        );
        button.innerHTML = `
          <img
            src="./assets/book.png" loading="lazy" alt="Book" class="w-4"> Lesson 0${level.level_no}
        `;
        hideLoader();
        buttonContainer.appendChild(button);

        button.addEventListener("click", (event) => {
          removeActiveButtons();
          button.classList.remove("non-active-btn");
          button.classList.add("active-btn");
          displayVocabularies(level.level_no);
        });
      })
    );
};

const displayVocabularies = (level) => {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then((res) => res.json())
    .then((object) => {
      if (object.data.length > 0) {
        vocabContainer.innerHTML = "";
        vocabContainer.classList.add(
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "gap-5"
        );

        object.data.forEach((vocab) => {
          const vocabCard = document.createElement("div");
          vocabCard.classList.add(
            "text-center",
            "flex",
            "flex-col",
            "p-8",
            "gap-3",
            "bg-white",
            "rounded-xl"
          );
          vocabCard.innerHTML = `
            <h4 class="text-primary-black text-2xl font-bold font-inter">${
              vocab.word
            }</h4>
            <h5 class="text-primary-black text-base font-medium font-inter">Meaning<br>(Pronunciation)</h5>
            <p class="text-primary-black text-2xl font-semibold font-siliguri opacity-80 min-h-16" lang="bn">${
              vocab.meaning ? vocab.meaning : "[Not found]"
            }<br>(${vocab.pronunciation})</p>
            <div class="flex justify-between">
              <a onclick="showVocabDetails(${
                vocab.id
              })" class="btn btn-square btn-md bg-[#1a91ff20] rounded-lg my-auto cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
              </a>
              <a onclick="pronounceWord('${
                vocab.word
              }')" class="btn btn-square btn-md bg-[#1a91ff20] rounded-lg p-2 my-auto cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" /><path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                </svg>
              </a>
            </div>
          `;
          hideLoader();
          vocabContainer.appendChild(vocabCard);
        });
      } else {
        vocabContainer.classList.remove(
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "gap-5"
        );
        hideLoader();
        vocabContainer.innerHTML = `
          <img src="./assets/alert.png" loading="lazy" alt="ALert" class="mx-auto mb-2" />
          <p class="text-[#79716b] font-siliguri text-sm text-center" lang="bn">এই Lesson-এ এখনো কোনো Vocabulary যুক্ত করা হয় নি।</p>
          <p class="text-secondary-black font-siliguri text-2xl sm:text-3xl font-medium mt-3 text-center">পরবর্তী Lesson-এ যান।</p>
        `;
      }
    });
};

const showVocabDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((object) => {
      modalBox.innerHTML = `
        <div class="border border-[#edf7ff] rounded-lg py-3 px-4 flex flex-col">
          <h4 class="text-2xl font-semibold" lang="bn">${
            object.data.word
          } (<img src="./assets/microphone.png" loading="lazy"
                alt="Microphone" class="inline w-6"> ${
                  object.data.pronunciation
                })</h4>
          <h5 class="text-base font-semibold mt-4">Meaning</h5>
          <p class="text-base ${
            object.data.meaning ? "font-medium" : ""
          } font-siliguri mt-1" lang="bn">${
        object.data.meaning ? object.data.meaning : "❌ Not found"
      }</p>
          <h5 class="text-base font-semibold mt-4">Example</h5>
          <p class="text-base font-siliguri mt-1">${
            object.data.sentence
              ? object.data.sentence
              : "❌ No meaningful example found."
          }</p>
          <h5 class="text-base font-semibold font-siliguri mt-4" lang="bn">সমার্থক শব্দসমূহ</h5>
          <div class="mt-1 flex flex-wrap gap-3">
            ${getSynonyms(object.data.synonyms)}
          </div>
        </div>
        <div class="modal-action justify-start mt-4">
          <form method="dialog">
            <button
                class="btn mx-0 bg-custom-purple hover:bg-custom-purple font-siliguri font-medium text-custom-white hover:text-custom-white text-lg rounded-xl px-6 h-6">Complete
                Learning</button>
          </form>
        </div>
      `;
      document.body.classList.remove("overflow-y-scroll");
      document.body.classList.add("overflow-y-auto");
      modal.showModal();
    });
};

const getSynonyms = (synonyms) => {
  let synonymsString = "";

  if (synonyms.length === 0) {
    return `<p class="text-base font-siliguri mt-1">❌ Not available</p>`;
  }

  synonyms.forEach((synonym) => {
    synonymsString += `<a class="btn btn-sm border-[#d7e4ef] hover:border-[#d7e4ef] px-3 py-1 text-sm font-normal opacity-80 bg-[#edf7ff] hover:bg-[#edf7ff] rounded-md">${
      synonym.charAt(0).toUpperCase() + synonym.slice(1)
    }</a>`;
  });
  return synonymsString;
};

const pronounceWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
};

displayLessonButtons();
showDefaultLesson();
