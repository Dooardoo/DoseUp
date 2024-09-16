const pharmacies = [
    {
      name: "Farmácia Central",
      distance: 1.2,
      address: "Rua A, 123",
      phone: "(11) 1234-5678",
      medicines: [
        { name: "Paracetamol", price: 5.50 },
        { name: "Ibuprofeno", price: 10.00 },
        { name: "Amoxicilina", price: 15.75 }
      ]
    },
    {
      name: "Farmácia do Povo",
      distance: 2.5,
      address: "Rua B, 456",
      phone: "(11) 9876-5432",
      medicines: [
        { name: "Paracetamol", price: 5.00 },
        { name: "Ibuprofeno", price: 9.80 },
        { name: "Loratadina", price: 12.30 }
      ]
    },
    {
      name: "Farmácia Vida",
      distance: 3.0,
      address: "Avenida C, 789",
      phone: "(11) 2468-1357",
      medicines: [
        { name: "Paracetamol", price: 5.20 },
        { name: "Dorflex", price: 6.50 },
        { name: "Omeprazol", price: 8.90 }
      ]
    }
];
  
  // Função para buscar remédios nas farmácias
  const findMedicineInPharmacies = (req, res) => {
    const medicineName = req.params.medicine; // Nome do remédio passado pela URL
    const result = pharmacies
      .map(pharmacy => {
        const foundMedicine = pharmacy.medicines.find(med => med.name === medicineName);
        if (foundMedicine) {
          return {
            pharmacy: pharmacy.name,
            distance: pharmacy.distance,
            price: foundMedicine.price
          };
        }
        return null;
      })
      .filter(result => result !== null);
  
    if (result.length === 0) {
      return res.status(404).json({ message: "Medicine not found in any pharmacy." });
    }
  
    res.json(result);
  };

  const findRandomPharmacy = (req, res) => {
    const randomIndex = Math.floor(Math.random() * pharmacies.length);
    const randomPharmacy = pharmacies[randomIndex]; 
    console.log(randomPharmacy)
    res.json(randomPharmacy);  // Agora incluirá 'address' e 'phone'
  };

 
  
  module.exports = { findMedicineInPharmacies, findRandomPharmacy };