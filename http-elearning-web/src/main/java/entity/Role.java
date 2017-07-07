/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author vietduc
 */
@Entity
@Table(catalog = "z11_elearning", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Role.findAll", query = "SELECT r FROM Role r")
    , @NamedQuery(name = "Role.findByRolecode", query = "SELECT r FROM Role r WHERE r.rolecode = :rolecode")
    , @NamedQuery(name = "Role.findByRoledesc", query = "SELECT r FROM Role r WHERE r.roledesc = :roledesc")})
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(nullable = false, length = 50)
    private String rolecode;
    @Size(max = 254)
    @Column(length = 254)
    private String roledesc;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "rolecode")
    private List<Rolepermission> rolepermissionList;
    @OneToMany(mappedBy = "rolecode")
    private List<User> userList;

    public Role() {
    }

    public Role(String rolecode) {
        this.rolecode = rolecode;
    }

    public String getRolecode() {
        return rolecode;
    }

    public void setRolecode(String rolecode) {
        this.rolecode = rolecode;
    }

    public String getRoledesc() {
        return roledesc;
    }

    public void setRoledesc(String roledesc) {
        this.roledesc = roledesc;
    }

    @XmlTransient
    public List<Rolepermission> getRolepermissionList() {
        return rolepermissionList;
    }

    public void setRolepermissionList(List<Rolepermission> rolepermissionList) {
        this.rolepermissionList = rolepermissionList;
    }

    @XmlTransient
    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rolecode != null ? rolecode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Role)) {
            return false;
        }
        Role other = (Role) object;
        if ((this.rolecode == null && other.rolecode != null) || (this.rolecode != null && !this.rolecode.equals(other.rolecode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Role[ rolecode=" + rolecode + " ]";
    }
    
}
