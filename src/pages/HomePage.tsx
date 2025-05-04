import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCountryClick = (country: any) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(results);
  };

  const handleFilter = (region: string) => {
    setRegionFilter(region);
    const results = region
      ? countries.filter((country) => country.region === region)
      : countries;
    setFilteredCountries(results);
  };

  return (
    <div className="p-4">
      {user ? (
        <>
          {/* Logout Button */}
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#3D90D7",
                color: "white",
                borderRadius: "50px",
                minWidth: "40px",
                height: "35px",
                "&:hover": {
                  backgroundColor: "#98D8EF",
                },
              }}
            >
              Logout
            </Button>
          </div>

          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>

          {/* Search and Filter Container */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px",
          }}>
            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search country by name"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={() => handleSearch(searchQuery)}
                      sx={{
                        backgroundColor: "#3D90D7",
                        color: "white",
                        borderRadius: "50px",
                        minWidth: "40px",
                        height: "35px",
                        "&:hover": {
                          backgroundColor: "#98D8EF",
                        },
                      }}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  paddingRight: "8px",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#98D8EF",
                  borderWidth: "1px",
                },
              }}
            />

            {/* Region Filter */}
            <TextField
              select
              value={regionFilter}
              onChange={(e) => handleFilter(e.target.value)}
              variant="outlined"
              sx={{
                width: "200px",
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#98D8EF",
                  borderWidth: "1px",
                },
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </TextField>
          </div>

          {/* Country List */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}>
            {filteredCountries.map((country) => (
              <Card
                key={country.cca3}
                onClick={() => handleCountryClick(country)}
                sx={{
                  width: "300px",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={country.flags.svg}
                  alt={`${country.name.common} flag`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Population:</strong> {country.population.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Region:</strong> {country.region}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Languages:</strong>{" "}
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Country Details Modal */}
          <Dialog
            open={isModalOpen}
            onClose={handleCloseModal}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedCountry?.name.common}
            </DialogTitle>
            <DialogContent>
              <img
                src={selectedCountry?.flags.svg}
                alt={`${selectedCountry?.name.common} flag`}
                style={{ width: "100%", marginBottom: "16px" }}
              />
              <Typography variant="body1" paragraph>
                <strong>Population:</strong> {selectedCountry?.population.toLocaleString()}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Region:</strong> {selectedCountry?.region}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Capital:</strong> {selectedCountry?.capital?.[0] || "N/A"}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Languages:</strong> {
                  selectedCountry?.languages
                    ? Object.values(selectedCountry.languages).join(", ")
                    : "N/A"
                }
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;