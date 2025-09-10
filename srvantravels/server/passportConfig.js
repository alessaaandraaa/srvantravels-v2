import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./db.js";

/**
 * Configures Passport.js for user authentication.
 *
 * @param {object} passport - The passport instance to configure.
 */

export default function configurePassport(passport) {
  // Use the LocalStrategy for username and password authentication
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Find the user in the database by their username
      const query = "SELECT * FROM Person WHERE name = ?";
      db.query(query, [username], (err, result) => {
        if (err) {
          // If there's a database error, return the error
          return done(err);
        }

        // Check if a user with that username was found
        if (result.length === 0) {
          // If not, return false to indicate authentication failure
          return done(null, false);
        }

        // Compare the submitted password with the hashed password in the database
        bcrypt.compare(password, result[0].password, (err, res) => {
          if (err) {
            // If there's an error with the comparison, return the error
            return done(err);
          }
          if (res) {
            // If passwords match, return the user object
            return done(null, result[0]);
          } else {
            // If passwords don't match, return false
            return done(null, false);
          }
        });
      });
    })
  );

  // Serialize the user to store in the session
  passport.serializeUser((user, done) => {
    // We only need to store the user's ID
    done(null, user.person_ID);
  });

  // Deserialize the user to retrieve their full information from the session
  passport.deserializeUser((id, done) => {
    const query = "SELECT * FROM Person WHERE person_ID = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        // Handle any database errors
        return done(err);
      }

      // Check if a user was found
      if (result.length === 0) {
        return done(null, false);
      }

      // Return the full user object
      const user = {
        id: result[0].person_ID,
        name: result[0].name,
        email: result[0].email,
        contact_number: result[0].contact_number,
      };
      done(null, user);
    });
  });
}
