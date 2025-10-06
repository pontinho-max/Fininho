export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const response = await fetch("https://api.mercadopago.com/preapproval_plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TEST-710********52094-10********cef70201********21d8fa0b********2853334"
    },
    body: JSON.stringify({
      reason: "Powercine",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        repetitions: 12,
        billing_day: 10,
        billing_day_proportional: false,
        free_trial: { frequency: 1, frequency_type: "months" },
        transaction_amount: 10,
        currency_id: "ARS"
      },
      payment_methods_allowed: {
        payment_types: [{ id: "credit_card" }],
        payment_methods: [{ id: "bolbradesco" }]
      },
      back_url: "https://powercine.vercel.app/"
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
