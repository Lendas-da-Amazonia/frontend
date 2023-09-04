import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box className="py-3 w-full flex justify-between items-center px-10 bg-white-700 fixed z-50 bottom-0 right-0">
      <Typography variant="body2" fontWeight="bold" sx={{ color: "#fff" }}>
        Feito por{" "}
        <a
          href="https://www.cristianaragao.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300"
        >
          @aragao
        </a>
      </Typography>
      <Box display="flex" gap={1}>
        <Typography variant="body2" fontWeight="bold" sx={{ color: "#fff" }}>
          <a
            href="/codigo_penal1.png"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fff" }}
          >
            Código Penal 1
          </a>
        </Typography>
        <Typography variant="body2" fontWeight="bold" sx={{ color: "#fff" }}>
          /
        </Typography>
        <Typography variant="body2" fontWeight="bold" sx={{ color: "#fff" }}>
          <a
            href="/codigo_penal2.png"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fff" }}
          >
            Código Penal 2
          </a>
        </Typography>
      </Box>

      <Typography variant="body2" fontWeight="bold" sx={{ color: "#fff" }}>
        Versão 1.2.3
      </Typography>
    </Box>
  );
};

export default Footer;
