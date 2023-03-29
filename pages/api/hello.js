// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  setTimeout(() => {
    console.log("hello");
    console.log(req.body);
    res.status(200).json({
      name: "John Doe",
      answer:
        "this is the answer to the question you asked me this is the answer to the question you askthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this isthis is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this ised me this is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me this is the answer to the question you asked me :) go to the source to see the answer in detail :) also you can ask me another question :) :) :)  anytime you want right? ",
      sources: ["first source", "second source", "last source"],
    });
  }, 1000);
}
