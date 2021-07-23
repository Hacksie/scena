const sign = require('jwt-encode');
import jwt_decode from 'jwt-decode'
// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let team = JSON.parse(localStorage.getItem('team')) || [];
let productions = JSON.parse(localStorage.getItem('productions')) || [];
let companies = JSON.parse(localStorage.getItem('companies')) || [];

const secret = "hackeddesign";

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {

        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 100);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    case url.endsWith('/company/register') && method === 'POST':
                        return registerCompany();
                    case url.match(/\/company\/\w+$/) && method === 'GET':
                        return getCompany();
                    case url.endsWith('/productions') && method === 'GET':
                        return getProductions();
                    case url.match(/\/productions\/\d+$/) && method === 'GET':
                        return getProduction();
                    // case url.match(/\/productions\/\d+\/scenes/) && method === 'GET':
                    //     return getScenes();
                    case url.endsWith('/productions/add') && method === 'POST':
                        return addProduction();
                    case url.match(/\/productions\/\d+$/) && method === 'DELETE':
                        return deleteProduction();
                    case url.match(/\/productions\/\d+$/) && method === 'PUT':
                        return updateProduction();
                    case url.endsWith('/team') && method === 'POST':
                        return getTeam();
                    case url.endsWith('/team/add') && method === 'POST':
                        return addTeam();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // authentication functions

            function authenticate() {
                const { username, password } = body;
                console.log('authenticate');

                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                const data = {
                    id: user.id,
                    companyId: user.companyId,
                    username: user.username,
                    name: user.name,
                    preferredName: user.preferredName,
                    role: user.role,
                    permissions: authenticationClaims(user.role)
                }

                const jwt = sign(data, secret);

                return ok({
                    token: jwt
                });
            }

            function authenticationClaims(role) {
                switch (role) {
                    case 'administrator':
                        return [
                            "canViewCompany",
                            "canUpdateCompany",
                            "canViewTeam",
                            "canUpdateCompanyTeam",
                            "canViewScenes",
                            "canViewScripts",
                            "canViewProduction",
                            "canUpdateProduction",
                        ]
                        break;
                    default:
                        return [
                        ]
                        break;
                }
            }

            function register() {
                const user = body;

                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();

                return ok(users);
            }

            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl(1));
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            // company functions
            function registerCompany() {
                const newCompany = body;
                
                if (users.find(x => x.username === newCompany.username)) {
                    return error(`Username  ${newCompany.username} is already taken`);
                }

                if (companies.find(x => x.id === newCompany.companyId)) {
                    return error(`Username  ${newCompany.companyId} is already taken`);
                }

                const company = {
                    id: newCompany.companyId,
                    displayName: newCompany.companyDisplayName
                }

                const user = {
                    id: users.length ? Math.max(...users.map(x => x.id)) + 1 : 1,
                    companyId: newCompany.companyId,
                    name: newCompany.name,
                    preferredName: newCompany.preferredName,
                    username: newCompany.username,
                    password: newCompany.password,
                    role: 'administrator'
                }

                users.push(user);
                companies.push(company);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('companies', JSON.stringify(companies));

                return ok();
            }


            function getCompany() {
                if (!isLoggedIn()) return unauthorized();
                const id = stringIdFromUrl(1);
                const company = companies.find(x => x.id == id);
                return ok(company);
            }



            function deleteCompany() {
                if (!isLoggedIn()) return unauthorized();

                companies = companies.filter(x => x.id !== idFromUrl(1));
                localStorage.setItem('companies', JSON.stringify(companies));
                return ok();
            }

            function updateCompany() {
                const company = body;
                if (!isLoggedIn()) return unauthorized();

                //company = companies.(x => x.id == id);

                localStorage.setItem('companies', JSON.stringify(companies));
                return ok();
            }

            // production functions
            function getProductions() {
                if (!isLoggedIn()) return unauthorized();
                const user = decodeToken();
                var filteredProductions = productions.filter(x => x.companyId === user.companyId);
                return ok(filteredProductions);
            }

            function getProduction() {

                if (!isLoggedIn()) return unauthorized();
                const id = stringIdFromUrl(1);
                var production = productions.find(x => x.id == id);
                return ok(production);
            }


            function addProduction() {
                if (!isLoggedIn()) return unauthorized();
                const user = decodeToken();
                var production = {
                    id: productions.length ? Math.max(...productions.map(x => x.id)) + 1 : 0,
                    companyId: user.companyId,
                    title: body.title
                }

                productions[production.id] = production;
                // productions.push(production);
                localStorage.setItem('productions', JSON.stringify(productions));
                return ok(production);
            }

            function deleteProduction() {
                if (!isLoggedIn()) return unauthorized();

                productions = productions.filter(x => x.id !== idFromUrl(1));
                localStorage.setItem('productions', JSON.stringify(productions));
                return ok();
            }

            function updateProduction() {
                const production = body;
                if (!isLoggedIn()) return unauthorized();

                productions[idFromUrl(1)] = production;
                localStorage.setItem('productions', JSON.stringify(productions));
                return ok(production);
            }

            // team functions

            function getTeam() {
                if (!isLoggedIn()) return unauthorized();

                return ok(team);
            }

            function addTeam() {
                const member = body;

                // assign user id and a few other properties then save
                member.id = team.length ? Math.max(...team.map(x => x.id)) + 1 : 1;
                team.push(member);
                localStorage.setItem('team', JSON.stringify(team));

                return ok(team);
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return true; //headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function decodeToken() {
                console.log(headers);
                return jwt_decode(headers['Authorization']);
            }

            function idFromUrl(pos) {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - pos]);
            }

            function stringIdFromUrl(pos) {
                const urlParts = url.split('/');
                return urlParts[urlParts.length - pos];
            }
        });
    }
}