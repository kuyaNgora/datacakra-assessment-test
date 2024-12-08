// src/serviceWorkerRegistration.ts

// Cek apakah browser mendukung service worker
if ("serviceWorker" in navigator) {
  // Daftarkan Service Worker jika di produksi
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    // Tidak daftarkan service worker jika aplikasi berjalan di subdirektori
    // atau bukan di server yang sama
    console.log("Service worker tidak bisa didaftarkan karena origin berbeda");
  } else {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker terdaftar:", registration);
        })
        .catch((error) => {
          console.log("Service Worker gagal didaftarkan:", error);
        });
    });
  }
}

export function register() {
  if (process.env.NODE_ENV === "production") {
    // Mendaftarkan service worker
    registerServiceWorker();
  }
}

function registerServiceWorker() {
  // Tambahkan logika jika ada pembaruan di service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        console.log("Service Worker siap.");
      })
      .catch((error) => {
        console.log("Service Worker gagal diaktifkan.", error);
      });
  }
}
