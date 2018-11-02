package br.ufg.familycare.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufg.familycare.model.Usuario;
import br.ufg.familycare.repository.UsuarioRepository;
import br.ufg.familycare.security.jwt.JwtTokenUtil;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	protected JwtTokenUtil jwtTokenUtil;
	
	public Usuario userFromRequest(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String email = jwtTokenUtil.getUsernameFromToken(token);
		return consultarPorEmail(email);
	}

	public Usuario salvar(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public Optional<Usuario> consultarPorId(Long id) {
		return usuarioRepository.findById(id);
	}
	
	public Usuario consultarPorEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

	public List<Usuario> listarTodos() {
		return usuarioRepository.findAll();
	}

	public void deletarPorId(Long id) {
		usuarioRepository.deleteById(id);
	}

}