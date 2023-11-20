import OpenAI from "openai";

const openai = new OpenAI({
  //apiKey: process.env.OPENAI_API_KEY,
  apiKey: import.meta.env.PUBLIC_OPEN_AI_API_KEY,
});

export const getFunFactAboutPokemon = async(pokemonName:string):Promise<string>=>{
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `Escribe algo divertido del pokemon: ${pokemonName}`,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.choices[0].text || `No tengo nothing sobre ${pokemonName}`
}
