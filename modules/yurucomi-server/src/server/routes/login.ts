import express from "express";
const router: express.Router = express.Router();
import _debug from "debug";
const debug = _debug("server:router/login");

router.post("/", (req: express.Request, res: express.Response) => {
  if (req.body.userName) {
    // req.session = Object.assign(
    //   { user: { name: req.body.userName } },
    //   req.session
    // );
    if (req.session) {
      req.session.userName = req.body.userName;
      debug(JSON.stringify(req.session));
      debug("login success");
      res.json({ result: true, name: req.body.userName });
    } else {
      debug("login failed");
      res.json({ result: false, name: null });
    }
  } else {
    debug("login failed");
    res.json({ result: false, name: null });
  }
});

export default router;
