import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { password } = req.body

  if (password === process.env.ADMIN_PASSWORD) {
    // ici tu peux mettre un cookie ou juste renvoyer "ok"
    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ success: false })
}
